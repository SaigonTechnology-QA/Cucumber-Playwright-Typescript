# How to use framework

## I. Selenium core

### DriverUtils

- **DriverUtils** is a utility class that provides a simple way to get a WebDriver instance. It is a wrapper around
  WebDriverManager.
- Default navigation timeout is **60 seconds**.

### Element

- **BaseElement** is a wrapper around WebElement. It provides a simple way to interact with web element(s).

- Default timeout for waiting for element ready to perform action is **30 seconds**.

- Some common methods:

  - click()
  - type()
  - getText()
  - getAttribute()
  - isVisible()
  - setDynamic() `to replace dynamic value in locator such as %s, %d`

_**Example**_:

```
public final BaseElement buttonLogin = new BaseElement("#login");

buttonLogin.click();
```

- **FormDropbox** is a subclass of BaseElement. It provides a simple way to interact with dropbox elements.

### Assertions

- **AssertUtils** is a utility class that provides a simple way to assert with WebDriver. It is a wrapper
  around `org.testng.Assert`

#### 1. Element Assertions

- Use **BaseElement**'s `shouldBe()` methods to assert element's state (visible, enabled, selected, etc.).
- Use **BaseElement**'s `shouldHave()` methods to assert element's attribute (text, value, etc.).
- Default timeout for Element assertion is **5 seconds**.

_**Example**_:

```
buttonLogin.shouldBe(visible);

buttonLogin.shouldHaveText("Login");

buttonLogin.shouldHaveAttribute(id, "login");
```

#### 2. Page Assertions

- Use **DriverUtils**'s `shouldHave()` methods to assert page's properties (url, title, etc.).
- Default timeout for Page assertion is **0 seconds** (after page loaded).
- Default navigation timeout is **60 seconds**.

_**Example**_:

```
DriverUtils.shouldHaveUrl("https://www.google.com/");
```

### Additional

- `src/test/java/playground` package contains some examples of how to use selenium core functions without cucumber.

## II. Cucumber

### 1. Feature files

- Feature files are located at `src/test/resources/features`.
- Scenario title starts with test case ID.
  - E.g. `NA-001 - Verify that staff can add new applicants successful when input all valid data into all fields`
- Use tags to group scenarios into different test categories.
  - E.g.
    - `@regression` `@smoke` `@sanity`
    - `@ignore` `@bug` `@negative` `@positive` `@new_applicants` `@campaign`

### 2. Step definitions

- Step definitions are located at `src/test/java/step`.

### 3. Hooks

- Hooks are located at `src/test/java/step/hook/CucumberHooks.java`.
- Use **CucumberHooks** to perform some actions before/after each scenario or step.

### 4. Cache data between steps

- Use **Cache** to store data between steps (`utils/Cache.java`).
- Define key name in `enums/Key.java` and use it to get/set data.
- Note: should be used only in step definitions class

_**Example**_:

```
Cache.set(Key.USERNAME, "admin");
Cache.get(Key.USERNAME, String.class); // return "admin"
```
