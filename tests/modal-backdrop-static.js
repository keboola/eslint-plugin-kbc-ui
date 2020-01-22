const RuleTester = require("eslint").RuleTester;
const rule = require("../rules/modal-backdrop-static");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run("modal-backdrop-static", rule, {
  valid: [
    { code: '<Modal backdrop="static" />' },
    { code: "<Modal backdrop={false} />" },
    { code: "<Modal backdrop={getBackdrop()} />" }
  ],
  invalid: [
    {
      code: "<Modal />",
      output: '<Modal backdrop="static"  />',
      errors: [{ message: 'Required "backdrop" props missing.' }]
    },
    {
      code: "<Modal backdrop />",
      output: '<Modal backdrop="static" />',
      errors: [{ message: 'Backdrop prop has required value of "static" or "false"' }]
    },
    {
      code: "<Modal backdrop={true} />",
      output: '<Modal backdrop="static" />',
      errors: [{ message: 'Backdrop prop has required value of "static" or "false"' }]
    },
    {
      code: "<Modal backdrop='random' />",
      output: '<Modal backdrop="static" />',
      errors: [{ message: 'Backdrop prop has required value of "static" or "false"' }]
    }
  ]
});
