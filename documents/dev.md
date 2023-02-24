# Guide to contribute

## 1. Create branch

- Create a new branch from `dev` branch
  - Branch name should be the task name
  - E.g. `fix-login-scenario`, `implement-create-new-candidate`, ...etc.

## 2. Write Scenario in feature file

- Create new feature file or add scenario to existing feature file
- Write scenario in Gherkin language (see [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/))

## 3. Write Step Definition

- Check the step definition is already existed or not (located at `src/test/java/step`)
  - If existed, use it
  - If not, create new step definition
- Write step definition in Java language (
  see [Cucumber Step Definition](https://cucumber.io/docs/cucumber/api/#step-definitions))
- Use `@Given`, `@When`, `@Then` annotation to map step definition to scenario
- Note:
  - Should not use `@And`, `@But` annotation in step definition (only use in feature file)
  - A `Then` step has to contain an assertion method (e.g. `shouldBe()`, `shouldHaveText()`, `shouldHaveAttribute()`,
    etc.) to verify the result of the step

## 4. Define elements and functions in Page Object

- See [Naming conventions](docs/naming_conventions.md)
- See [Framework Introduction](docs/framework_introduction.md)

## 5. Run test on local

- Run `mvn clean test -Dcucumber.filter.name='<scenario_title>'` to run test
- Or run `mvn clean test -Dcucumber.filter.tags='<id>'` to run test by id
  - options: `-Denv=<env>` to override env value in `globalconfig.properties`

## 6. Create Pull Request

- Create a new Pull Request from your branch to `dev` branch
- Assign reviewers to review your code
- Reply/resolve comments from reviewers
- Wait for reviewers to approve your code and merge your PR
- Delete your branch after merged
