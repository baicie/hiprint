// webpack module 26
export default function (t, e) {
  var n, i
  ;(jQuery,
    (n = 'connected'),
    (i = 'reconnecting'),
    (window.hiwebSocket = {
      opened: !1,
      name: 'webSockets',
      reconnectTimeout: 6e4,
      reconnectWindowSetTimeout: null,
      reconnectDelay: 2e3,
      supportsKeepAlive: function supportsKeepAlive() {
        return !0
      },
      hasIo: function hasIo(t) {
        return window.io
      },
      send: function send(t) {
        try {
          this.socket.emit('news', t)
        } catch (e) {
          console.log('send data error:' + (t || '') + JSON.stringify(e))
        }
      },
      getPrinterList: function getPrinterList() {
        return this.printerList
      },
      start: function start() {
        var _this = this
        var t = this
        window.WebSocket
          ? this.socket ||
            ((this.socket = io('http://localhost:17521', {
              reconnectionAttempts: 5,
            })),
            this.socket.on('connect', function (e) {
              ;((t.opened = !0),
                console.log('Websocket opened.'),
                _this.socket.on('successs', function (t) {
                  hinnn.event.trigger('printSuccess_' + t.templateId, t)
                }),
                _this.socket.on('error', function (t) {
                  hinnn.event.trigger('printError_' + t.templateId, t)
                }),
                _this.socket.on('printerList', function (e) {
                  t.printerList = e
                }),
                (t.state = n))
            }),
            this.socket.on('disconnect', function () {
              t.opened = !1
            }))
          : console.log('WebSocket start fail')
      },
      reconnect: function reconnect() {
        ;(this.state !== n && this.state !== i) ||
          (this.stop(),
          this.ensureReconnectingState() && (console.log('Websocket reconnecting.'), this.start()))
      },
      stop: function stop() {
        this.socket &&
          (console.log('Closing the Websocket.'), this.socket.close(), (this.socket = null))
      },
      ensureReconnectingState: function ensureReconnectingState() {
        return ((this.state = i), this.state === i)
      },
    }))
}
