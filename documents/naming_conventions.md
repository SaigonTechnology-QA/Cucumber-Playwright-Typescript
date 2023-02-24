# Naming Conventions

## Selectors

### 1. Web Element locator variable names

`<prefix><selectorName>`

| Prefix | Element Type |                Example |
| ------ | :----------- | ---------------------: |
| btn    | Button       |               btnLogin |
| txt    | TextBox      |            txtUsername |
| link   | Link         |              linkAbout |
| lbl    | Label        |           lblNoteTitle |
| img    | Image        |             imgProfile |
| drp    | Dropdown     |              drpStatus |
| chk    | Checkbox     |        chkPrimarySkill |
| cbb    | ComboBox     | cbbJobSkillInterviewer |
| icon   | Icon         |         iconInfoActive |
| table  | Table        |         tableCampaigns |
| row    | Row          |               rowFirst |
| col    | Column       |            colJobTitle |
| cell   | Cell         |        cellRequestDate |
| item   | Item (Table) |       itemCampaignList |

### 2. Web Element locator return multiple elements

`<prefix>s<selectorName>`

| Example         |
| --------------- |
| txtsAttention   |
| imgsSidebar     |
| iconsInfoActive |
| linksNoteBook   |

## Others

- File, Class, Module: `PascalCase`
  - (e.g. `BaseElement`)
- Package: `lowercase` without `- or _`
  - (e.g. `com.saitama.ultimatepower`)
- Function, variable: `camelCase`
  - (e.g. `getDriver()`, `firstName`)
- Page: `<PageName>Page`
  - (e.g. `LoginPage`)
- Step Definition: `<ModuleName>Step`
  - (e.g. `LoginStep`)
- Folder and files in resources: `lowercase` with `-` between words
  - (e.g. `src/test/resources/features/new-applicants.feature`)
