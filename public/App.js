'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = App;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function checkSTIG(manifest) {
  // STIG checks
  var rules = [{
    id: 'V-242851',
    category: 'CAT I',
    pattern: 'android:debuggable="true"',
    description: 'Allows remote memory extraction.',
    label: 'debuggable="true"'
  }, {
    id: 'V-242854',
    category: 'CAT I',
    pattern: 'usesCleartextTraffic',
    description: 'Sends CoT/PLI data without TLS.',
    label: 'usesCleartextTraffic'
  }, {
    id: 'V-2026-MTD',
    category: 'CAT I',
    pattern: 'MTD Hook',
    description: 'Fails 2026 Mobile Security Mandate.',
    label: 'Missing MTD Hook'
  }, {
    id: 'V-242852',
    category: 'CAT II',
    pattern: 'android:allowBackup="true"',
    description: 'Permits local data extraction via ADB.',
    label: 'allowBackup="true"'
  }, {
    id: 'V-242855',
    category: 'CAT II',
    pattern: 'android:exported="true"',
    description: 'Allows malicious apps to hijack intents.',
    label: 'Exported Components'
  }];
  var issues = [];
  rules.forEach(function (rule) {
    if (manifest.includes(rule.pattern) || rule.label === 'Missing MTD Hook' && !manifest.includes('MTD Hook')) {
      issues.push({
        id: rule.id,
        category: rule.category,
        label: rule.label,
        description: rule.description
      });
    }
  });
  return issues;
}

function App() {
  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var manifest = _useState2[0];
  var setManifest = _useState2[1];

  var _useState3 = (0, _react.useState)([]);

  var _useState32 = _slicedToArray(_useState3, 2);

  var issues = _useState32[0];
  var setIssues = _useState32[1];

  var handleCheck = function handleCheck() {
    setIssues(checkSTIG(manifest));
  };

  return _react2['default'].createElement(
    'div',
    { style: { padding: 24, maxWidth: 800, margin: 'auto', background: '#222', color: '#fff' } },
    _react2['default'].createElement(
      'h1',
      null,
      'Android Manifest STIG Checker'
    ),
    _react2['default'].createElement('textarea', {
      rows: 12,
      style: { width: '100%', fontFamily: 'monospace', fontSize: 16, marginBottom: 16 },
      placeholder: 'Paste your AndroidManifest.xml here',
      value: manifest,
      onChange: function (e) {
        return setManifest(e.target.value);
      }
    }),
    _react2['default'].createElement(
      'button',
      { onClick: handleCheck, style: { padding: '8px 24px', fontSize: 16 } },
      'Check STIG'
    ),
    _react2['default'].createElement(
      'div',
      { style: { marginTop: 24 } },
      _react2['default'].createElement(
        'h2',
        null,
        'STIG Issues'
      ),
      issues.length === 0 ? _react2['default'].createElement(
        'p',
        null,
        'No issues found.'
      ) : _react2['default'].createElement(
        'table',
        { style: { width: '100%', background: '#333', color: '#fff', borderCollapse: 'collapse' } },
        _react2['default'].createElement(
          'thead',
          null,
          _react2['default'].createElement(
            'tr',
            null,
            _react2['default'].createElement(
              'th',
              { style: { border: '1px solid #444', padding: 8 } },
              'Category'
            ),
            _react2['default'].createElement(
              'th',
              { style: { border: '1px solid #444', padding: 8 } },
              'STIG ID'
            ),
            _react2['default'].createElement(
              'th',
              { style: { border: '1px solid #444', padding: 8 } },
              'Issue'
            ),
            _react2['default'].createElement(
              'th',
              { style: { border: '1px solid #444', padding: 8 } },
              'Impact'
            )
          )
        ),
        _react2['default'].createElement(
          'tbody',
          null,
          issues.map(function (issue, idx) {
            return _react2['default'].createElement(
              'tr',
              { key: idx },
              _react2['default'].createElement(
                'td',
                { style: { border: '1px solid #444', padding: 8 } },
                issue.category
              ),
              _react2['default'].createElement(
                'td',
                { style: { border: '1px solid #444', padding: 8 } },
                issue.id
              ),
              _react2['default'].createElement(
                'td',
                { style: { border: '1px solid #444', padding: 8 } },
                issue.label
              ),
              _react2['default'].createElement(
                'td',
                { style: { border: '1px solid #444', padding: 8 } },
                issue.description
              )
            );
          })
        )
      )
    )
  );
}

module.exports = exports['default'];