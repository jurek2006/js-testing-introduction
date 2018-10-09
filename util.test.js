const { generateText } = require("./util");

test("should output name and age", () => {
    const text = generateText("Max", 29);
    expect(text).toBe("Max (29 years old)");
    const text2 = generateText("Anna", 38);
    expect(text2).toBe("Anna (38 years old)");
});

test("should output data-less text", () => {
    const text = generateText("", null);
    expect(text).toBe(" (null years old)");
});
