import { ESLint } from "eslint";
import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

import webConfig from "../web.js";

const eslint = new ESLint({
  overrideConfig: webConfig,
  overrideConfigFile: true,
});

const fixture = (name: string) =>
  readFileSync(join(__dirname, "fixtures", name), "utf-8");

describe("Web Config", () => {
  it("allows browser globals without no-undef", async () => {
    const code =
      "const id = window.requestAnimationFrame(() => document.title);\n";
    const results = await eslint.lintText(code, { filePath: "test.js" });
    const undef = results[0].messages.filter((m) => m.ruleId === "no-undef");
    expect(undef).toHaveLength(0);
  });

  describe("inherits Node config rules", () => {
    it("should enforce import sorting", async () => {
      const code = fixture("import-sort-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.ts" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "simple-import-sort/imports",
      );
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should flag unused imports", async () => {
      const code = fixture("unused-imports-invalid.ts");
      const results = await eslint.lintText(code, { filePath: "test.tsx" });
      const errors = results[0].messages.filter(
        (m) => m.ruleId === "unused-imports/no-unused-imports",
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
