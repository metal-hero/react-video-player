"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoPlayer = function (_React$Component) {
    _inherits(VideoPlayer, _React$Component);

    function VideoPlayer(props) {
        _classCallCheck(this, VideoPlayer);

        var _this = _possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).call(this, props));

        _this.state = {
            play: false,
            currentTime: undefined,
            duration: undefined,
            ended: false,
            mouseOver: true,
            fullscreen: false,
            inputActive: false
        };

        _this.coverOnClick = _this.coverOnClick.bind(_this);
        _this.componentDidMount = _this.componentDidMount.bind(_this);
        _this.playVideo = _this.playVideo.bind(_this);
        _this.pauseVideo = _this.pauseVideo.bind(_this);
        _this.onTimeUpdate = _this.onTimeUpdate.bind(_this);
        _this.parseTime = _this.parseTime.bind(_this);
        _this.onLoadedData = _this.onLoadedData.bind(_this);
        _this.onEnded = _this.onEnded.bind(_this);
        _this.requestFullScreen = _this.requestFullScreen.bind(_this);
        _this.exitFullScreen = _this.exitFullScreen.bind(_this);
        _this.rewind = _this.rewind.bind(_this);
        _this.onArrowClick = _this.onArrowClick.bind(_this);
        _this.getOffset = _this.getOffset.bind(_this);
        _this.playFrom = _this.playFrom.bind(_this);
        _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
        return _this;
    }

    _createClass(VideoPlayer, [{
        key: "parseTime",
        value: function parseTime(sec) {
            var minutes = Math.floor(sec / 60);
            var seconds = parseInt(sec % 60);
            var hours = Math.floor(sec / 3600);

            return {
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            var video = document.getElementById("video_" + this.props.counter);
            video.play();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var self = this;
            var video = document.getElementById("video_" + this.props.counter);

            if (this.props.startFrom) {
                this.setState({
                    play: true
                });
                this.playFrom(parseInt(this.props.startFrom));
            }

            if (this.state.inputActive) {
                document.getElementById("video_input_" + this.props.counter).focus();
            }

            video.addEventListener('loadstart', function (e) {});

            video.addEventListener("timeupdate", function (e) {});
        }
    }, {
        key: "onLoadedData",
        value: function onLoadedData(e) {
            var self = this;
            var video = e.target;

            self.setState({
                duration: self.parseTime(video.duration)
            });
        }
    }, {
        key: "onTimeUpdate",
        value: function onTimeUpdate(e) {
            var self = this;
            var video = e.target;

            self.setState({
                currentTime: this.parseTime(video.currentTime),
                percentage: parseInt(video.currentTime / video.duration * 100)
            });
        }
    }, {
        key: "onEnded",
        value: function onEnded(e) {
            var self = this;
            self.setState({
                ended: true
            });
        }
    }, {
        key: "playVideo",
        value: function playVideo(e) {
            var video = document.getElementById("video_" + this.props.counter);
            video.play();
            this.setState({
                play: true,
                ended: false
            });
        }
    }, {
        key: "pauseVideo",
        value: function pauseVideo(e) {
            var video = document.getElementById("video_" + this.props.counter);
            video.pause();
            this.setState({
                play: false
            });
        }
    }, {
        key: "coverOnClick",
        value: function coverOnClick(e) {
            var _this2 = this;

            var self = this;

            self.setState({
                inputActive: true
            }, function () {
                document.getElementById("video_input_" + _this2.props.counter).focus();
            });

            return this.state.play ? this.pauseVideo(e) : this.playVideo(e);
        }
    }, {
        key: "rewind",
        value: function rewind(time, increase) {
            var self = this;
            var video = document.getElementById("video_" + this.props.counter);

            if (increase) {
                video.currentTime += time;
            } else {
                video.currentTime -= time;
            }

            self.setState({
                currentTime: video.currentTime
            });
        }
    }, {
        key: "onArrowClick",
        value: function onArrowClick(e) {
            var video = document.getElementById("video_" + this.props.counter);
            var self = this;

            switch (e.which) {
                case 37:
                    e.preventDefault();
                    self.rewind(parseInt(video.duration / 10), false);
                    break;
                case 39:
                    e.preventDefault();
                    self.rewind(parseInt(video.duration / 10), true);
                    break;
                case 32:
                    e.preventDefault();
                    if (self.state.play) {
                        self.pauseVideo(e);
                    } else {
                        self.playVideo(e);
                    }
                    break;
                default:
                    e.preventDefault();
            }
        }
    }, {
        key: "requestFullScreen",
        value: function requestFullScreen(e) {
            var video = document.getElementById("video_" + this.props.counter);
            if (video.webkitRequestFullScreen) {
                video.webkitRequestFullScreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            }
            this.setState({
                fullscreen: true
            });
        }
    }, {
        key: "exitFullScreen",
        value: function exitFullScreen(e) {
            var video = document.getElementById("video_" + this.props.counter);
            if (document.webkitIsFullScreen) {
                this.setState({
                    fullscreen: false
                }, function () {
                    document.webkitCancelFullScreen();
                });
            }
        }
    }, {
        key: "getOffset",
        value: function getOffset(evt) {
            var el = evt.currentTarget,
                x = 0,
                y = 0;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                x += el.offsetLeft - el.scrollLeft;
                y += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
            x = evt.clientX - x;
            y = evt.clientY - y;
            var video = document.getElementById("video_" + this.props.counter);
            var ratio = evt.currentTarget.offsetWidth / x;
            var res = video.duration / ratio;

            this.playFrom(res);
        }
    }, {
        key: "playFrom",
        value: function playFrom(sec) {
            var video = document.getElementById("video_" + this.props.counter);
            video.pause();
            video.currentTime = sec;
            this.setState({
                currentTime: video.currentTime
            });
            video.play();
        }
    }, {
        key: "render",
        value: function render() {
            var self = this;

            var timeToString = function timeToString(time) {
                var hours = time.hours < 10 ? "0" + time.hours : time.hours;
                var minutes = time.minutes < 10 ? "0" + time.minutes : time.minutes;
                var seconds = time.seconds < 10 ? "0" + time.seconds : time.seconds;

                if (!minutes || !seconds) {
                    return "";
                }

                if (hours < 1) {
                    return minutes + ":" + seconds;
                }

                return hours + ":" + minutes + ":" + seconds;
            };

            return _react2.default.createElement(
                "div",
                {
                    className: "react-video-player main-video",
                    onContextMenu: function onContextMenu(e) {
                        e.preventDefault();
                        return false;
                    },
                    onMouseLeave: function onMouseLeave() {
                        self.setState({ mouseOver: false });
                    },
                    onMouseOver: function onMouseOver() {
                        self.setState({ mouseOver: true });
                    }
                },
                _react2.default.createElement(
                    "video",
                    {
                        src: this.props.videoSrc,
                        id: "video_" + this.props.counter,
                        onTimeUpdate: this.onTimeUpdate,
                        onLoadedData: this.onLoadedData,
                        onEnded: this.onEnded,
                        onKeyPress: this.onArrowClick, onKeyDown: this.onArrowClick
                    },
                    _react2.default.createElement("source", { src: this.props.videoSrc, type: "video/mp4" }),
                    "Your browser does not support HTML5 video."
                ),
                _react2.default.createElement("input", { type: "text", className: "hidden_input", id: "video_input_" + this.props.counter,
                    onKeyPress: this.onArrowClick, onKeyDown: this.onArrowClick }),
                _react2.default.createElement("div", { className: "video-cover", id: "video_cover_" + this.props.counter, onClick: this.coverOnClick }),
                this.state.mouseOver || !this.state.play ? _react2.default.createElement(
                    "div",
                    { className: "video-controls",
                        onKeyPress: this.onArrowClick, onKeyDown: this.onArrowClick },
                    _react2.default.createElement(
                        "div",
                        { className: "video-progress",
                            onClick: this.getOffset
                        },
                        _react2.default.createElement(
                            "div",
                            { className: "full",
                                style: { width: this.state.percentage > 0 ? this.state.percentage + "%" : "0%" } },
                            _react2.default.createElement("span", {
                                className: "progress-controller" })
                        ),
                        _react2.default.createElement("div", { className: "loaded" })
                    ),
                    this.state.play ? _react2.default.createElement(
                        "span",
                        { onClick: this.state.ended ? this.playVideo : this.pauseVideo },
                        _react2.default.createElement("i", {
                            className: this.state.ended ? "fa fa-refresh control-icon" : "fa fa-pause control-icon" })
                    ) : _react2.default.createElement(
                        "span",
                        { onClick: this.playVideo },
                        _react2.default.createElement("i", { className: "fa fa-play control-icon" })
                    ),
                    _react2.default.createElement(
                        "span",
                        null,
                        _react2.default.createElement("i", { className: "fa fa-volume-up control-icon" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "time-bar" },
                        _react2.default.createElement(
                            "span",
                            {
                                className: "current-time" },
                            this.state.currentTime ? timeToString(this.state.currentTime) : "00:00"
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "time-divider" },
                            "/"
                        ),
                        _react2.default.createElement(
                            "span",
                            {
                                className: "duration" },
                            this.state.duration ? timeToString(this.state.duration) : "00:00"
                        )
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "right-controls" },
                        this.state.fullscreen || document.webkitIsFullScreen ? _react2.default.createElement(
                            "span",
                            { className: "request-fullscreen", onClick: this.exitFullScreen },
                            _react2.default.createElement("i", { className: "fa fa-compress control-icon" })
                        ) : _react2.default.createElement(
                            "span",
                            { className: "request-fullscreen", onClick: this.requestFullScreen },
                            _react2.default.createElement("i", { className: "fa fa-arrows-alt control-icon" })
                        )
                    )
                ) : false
            );
        }
    }]);

    return VideoPlayer;
}(_react2.default.Component);

exports.default = VideoPlayer;
