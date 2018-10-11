const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

// UNIT TESTS
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

// INTEGRATION TESTS
test("should generate a valid text output", () => {
    const text = checkAndGenerate("Max", 29);
    expect(text).toBe("Max (29 years old)");
});
test("should return false for invalid data", () => {
    const text = checkAndGenerate("", 29);
    expect(text).toBe(false);
    const text2 = checkAndGenerate("Max");
    expect(text2).toBe(false);
});

// e2e TESTS
test("should create an element with text and correct class", async () => {
    const browser = await puppeteer.launch({
        headless: true
        // slowMo: 80,
        // args: ["--window-size=1920,1080"]
    });
    const page = await browser.newPage();
    await page.goto(
        "file:///home/jurek/Dokumenty/PROGRAMOWANIE/PROJEKTY/js-testing-introduction/index.html"
    );
    await page.click("input#name");
    await page.type("input#name", "Anna");
    await page.click("input#age");
    await page.type("input#age", "38");
    await page.click("button#btnAddUser");
    const finalText = await page.$eval(".user-item", el => el.textContent);
    expect(finalText).toBe("Anna (38 years old)");
});
