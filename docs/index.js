'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDomClient = require('react-dom/client');

var _AppJsx = require('./App.jsx');

var _AppJsx2 = _interopRequireDefault(_AppJsx);

var root = (0, _reactDomClient.createRoot)(document.getElementById('root'));
root.render(_react2['default'].createElement(_AppJsx2['default'], null));