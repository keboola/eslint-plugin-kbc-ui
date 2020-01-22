module.exports = {
  meta: {
    fixable: "code"
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name !== "Modal") {
          return;
        }

        let backdrop = {};
        node.attributes.forEach(attribute => {
          if (attribute.type !== "JSXAttribute") {
            return;
          }

          if (attribute.name.name === "backdrop") {
            backdrop = attribute;
          }
        });

        if (typeof backdrop.name === "undefined") {
          context.report({
            node,
            message: 'Required "backdrop" props missing.',
            fix(fixer) {
              return fixer.insertTextAfter(node.name, ' backdrop="static" ');
            }
          });
        } else if (
          backdrop.value === null ||
          (typeof backdrop.value.value !== "undefined" && backdrop.value.value !== "static") ||
          (typeof backdrop.value.expression !== "undefined" &&
            typeof backdrop.value.expression.value !== "undefined" &&
            backdrop.value.expression.value !== false)
        ) {
          context.report({
            node,
            message: 'Backdrop prop has required value of "static" or "false"',
            fix(fixer) {
              return fixer.replaceText(backdrop, 'backdrop="static"');
            }
          });
        }
      }
    };
  }
};
