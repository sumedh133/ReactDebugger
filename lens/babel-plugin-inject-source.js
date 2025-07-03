import path from "node:path";

/** @type {import('@babel/core').PluginObj} */
const injectSource = ({ types: t }) => {
  return {
    visitor: {
      JSXOpeningElement(pathNode, state) {
        const filename = state.file.opts.filename;
        if (!filename || filename.includes("node_modules")) return;

        // ✅ Inject only into DOM tags (lowercase like div, span)
        const tag = pathNode.node.name;
        if (!t.isJSXIdentifier(tag)) return;
        if (!/^[a-z]/.test(tag.name)) return; // skip React components and fragments

        const relPath = path.relative(process.cwd(), filename);
        const line = pathNode.node.loc?.start.line;
        if (!line) return;

        const hasAttr = pathNode.node.attributes.some(
          (attr) => attr.name?.name === "data-source"
        );
        if (hasAttr) return;

        pathNode.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("data-source"),
            t.stringLiteral(`${relPath}:${line}`)
          )
        );
      },
    },
  };
};

export default injectSource;
