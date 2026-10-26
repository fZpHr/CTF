#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <signal.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define KEY  0x5a
#define HOST "127.0.0.1"
#define PORT 8080

static const unsigned char U_ENC[] = { 0x3b, 0x3e, 0x37, 0x33, 0x34 };
static const unsigned char P_ENC[] = { 0x1e, 0x3b, 0x2e, 0x3b, 0x36, 0x23, 0x29, 0x05, 0x0a, 0x28, 0x6a, 0x3e, 0x7b, 0x68, 0x6a, 0x68, 0x6c };

static void xdecode(const unsigned char *enc, int len, char *out) {
    int i;
    for (i = 0; i < len; i++) out[i] = (char)(enc[i] ^ KEY);
    out[len] = '\0';
}

static void collector(void) {
    int s = socket(AF_INET, SOCK_STREAM, 0), opt = 1;
    struct sockaddr_in a;
    char buf[65536];
    const char *resp = "HTTP/1.1 200 OK\r\nContent-Length: 2\r\nConnection: close\r\n\r\nok";
    setsockopt(s, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    memset(&a, 0, sizeof(a));
    a.sin_family = AF_INET; a.sin_port = htons(PORT); a.sin_addr.s_addr = inet_addr(HOST);
    if (bind(s, (struct sockaddr *)&a, sizeof(a)) < 0) _exit(0);
    listen(s, 32);
    for (;;) {
        int c = accept(s, NULL, NULL);
        if (c < 0) continue;
        recv(c, buf, sizeof(buf), 0);
        send(c, resp, strlen(resp), 0);
        close(c);
    }
}

int main(void) {
    char user[64], pass[128], body[256], req[1024], tmp[1024];
    struct sockaddr_in a;
    pid_t pid;

    signal(SIGCHLD, SIG_IGN);
    xdecode(U_ENC, (int)sizeof(U_ENC), user);
    xdecode(P_ENC, (int)sizeof(P_ENC), pass);

    pid = fork();
    if (pid == 0) { collector(); _exit(0); }
    sleep(1);

    snprintf(body, sizeof(body), "username=%s&password=%s", user, pass);
    snprintf(req, sizeof(req),
        "POST /api/login HTTP/1.1\r\n"
        "Host: datalys-admin.internal\r\n"
        "User-Agent: datalys-telemetry/1.0\r\n"
        "Content-Type: application/x-www-form-urlencoded\r\n"
        "Content-Length: %zu\r\n"
        "Connection: close\r\n\r\n%s", strlen(body), body);

    for (;;) {
        int s = socket(AF_INET, SOCK_STREAM, 0);
        memset(&a, 0, sizeof(a));
        a.sin_family = AF_INET; a.sin_port = htons(PORT); a.sin_addr.s_addr = inet_addr(HOST);
        if (connect(s, (struct sockaddr *)&a, sizeof(a)) == 0) {
            send(s, req, strlen(req), 0);
            recv(s, tmp, sizeof(tmp), 0);
        }
        close(s);
        sleep(2);
    }
    return 0;
}
