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
    description: 'The AndroidManifest.xml must not set android:debuggable="true" in production. This allows remote memory extraction and debugging.',
    label: 'debuggable="true"'
  }, {
    id: 'V-242852',
    category: 'CAT II',
    pattern: 'android:allowBackup="true"',
    description: 'The AndroidManifest.xml must not set android:allowBackup="true". This permits local data extraction via ADB.',
    label: 'allowBackup="true"'
  }, {
    id: 'V-242854',
    category: 'CAT I',
    pattern: 'android:usesCleartextTraffic="true"',
    description: 'The AndroidManifest.xml must not allow cleartext traffic. All network traffic must be encrypted.',
    label: 'usesCleartextTraffic'
  }, {
    id: 'V-242855',
    category: 'CAT II',
    pattern: 'android:exported="true"',
    description: 'Exported components must be restricted. android:exported="true" can allow malicious apps to hijack intents.',
    label: 'Exported Components'
  }, {
    id: 'V-242856',
    category: 'CAT II',
    pattern: 'android:permission="android.permission.WRITE_EXTERNAL_STORAGE"',
    description: 'The app must not request WRITE_EXTERNAL_STORAGE permission unless absolutely necessary. This can expose sensitive data.',
    label: 'WRITE_EXTERNAL_STORAGE'
  }, {
    id: 'V-242857',
    category: 'CAT II',
    pattern: 'android:permission="android.permission.READ_PHONE_STATE"',
    description: 'The app must not request READ_PHONE_STATE permission unless required. This can expose device information.',
    label: 'READ_PHONE_STATE'
  }, {
    id: 'V-242858',
    category: 'CAT II',
    pattern: 'android:permission="android.permission.ACCESS_FINE_LOCATION"',
    description: 'The app must not request ACCESS_FINE_LOCATION permission unless required. This can expose user location.',
    label: 'ACCESS_FINE_LOCATION'
  }, {
    id: 'V-242859',
    category: 'CAT II',
    pattern: 'android:permission="android.permission.CAMERA"',
    description: 'The app must not request CAMERA permission unless required. This can expose user privacy.',
    label: 'CAMERA'
  }, {
    id: 'V-242860',
    category: 'CAT II',
    pattern: 'android:permission="android.permission.RECORD_AUDIO"',
    description: 'The app must not request RECORD_AUDIO permission unless required. This can expose user privacy.',
    label: 'RECORD_AUDIO'
  }, {
    id: 'V-242861',
    category: 'CAT II',
    pattern: 'android:permission="android.permission.BLUETOOTH_ADMIN"',
    description: 'The app must not request BLUETOOTH_ADMIN permission unless required. This can expose device connectivity.',
    label: 'BLUETOOTH_ADMIN'
  }];

  // Add more rules as needed from official STIG documentation
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

  // ...existing code...
  var compliantSample = '<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.stigcompliant">\n\n    <!-- STIG-compliant settings -->\n    <uses-permission android:name="android.permission.INTERNET" />\n    <!-- No dangerous permissions -->\n    <!-- No exported components -->\n\n    <application\n        android:allowBackup="false"\n        android:debuggable="false"\n        android:exported="false"\n        android:usesCleartextTraffic="false"\n        android:networkSecurityConfig="@xml/network_security_config">\n        <activity android:name=".MainActivity" android:exported="false" />\n    </application>\n</manifest>';
  var noncompliantSample = '<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.stigviolations">\n\n    <!-- Common STIG infractions -->\n    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />\n    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />\n    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />\n    <uses-permission android:name="android.permission.CAMERA" />\n    <!-- Exported activity -->\n\n    <application\n        android:allowBackup="true"\n        android:debuggable="true"\n        android:exported="true"\n        android:usesCleartextTraffic="true">\n        <activity android:name=".MainActivity" android:exported="true" />\n    </application>\n</manifest>';

  var handleLoadCompliant = function handleLoadCompliant() {
    return setManifest(compliantSample);
  };
  var handleLoadNoncompliant = function handleLoadNoncompliant() {
    return setManifest(noncompliantSample);
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
      'div',
      { style: { display: 'flex', gap: 12, marginBottom: 16 } },
      _react2['default'].createElement(
        'button',
        { onClick: handleCheck, style: { padding: '8px 24px', fontSize: 16 } },
        'Check STIG'
      ),
      _react2['default'].createElement(
        'button',
        { onClick: handleLoadNoncompliant, style: { padding: '8px 24px', fontSize: 16 } },
        'Load Noncompliant Sample'
      ),
      _react2['default'].createElement(
        'button',
        { onClick: handleLoadCompliant, style: { padding: '8px 24px', fontSize: 16 } },
        'Load Compliant Sample'
      )
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