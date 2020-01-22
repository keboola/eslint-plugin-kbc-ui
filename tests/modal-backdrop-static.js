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
    { code: "<Modal />" }, // probably not react-bootstrap modal
    { code: '<Modal backdrop="static"></Modal>' },
    { code: "<Modal backdrop={false}></Modal>" },
    { code: "<Modal backdrop={getBackdrop()}></Modal>" }
  ],
  invalid: [
    {
      code: "<Modal ></Modal>",
      output: '<Modal backdrop="static"  ></Modal>',
      errors: [{ message: 'Required "backdrop" props missing.' }]
    },
    {
      code: "<Modal backdrop ></Modal>",
      output: '<Modal backdrop="static" ></Modal>',
      errors: [{ message: 'Backdrop prop has required value of "static" or "false"' }]
    },
    {
      code: "<Modal backdrop={true} ></Modal>",
      output: '<Modal backdrop="static" ></Modal>',
      errors: [{ message: 'Backdrop prop has required value of "static" or "false"' }]
    },
    {
      code: "<Modal backdrop='random' ></Modal>",
      output: '<Modal backdrop="static" ></Modal>',
      errors: [{ message: 'Backdrop prop has required value of "static" or "false"' }]
    }
  ]
});
