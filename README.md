# Git Browser
### A simple git repository browser
A simple UI to display a list of any Organization's GitHub projects ranked by total forks, and display the top 10 recent commits on that project.

### Execution
This project is built using Vanilla JS and JQuery. This does not require any setup for execution, Open `index.html` in any browser.

### Testing
* The Application does not have any User Authentication.
* No automated tests are included in this project. Manual tests can be performed by doing the following:
* Search for a nonexistent organization, e.g. `xyz`. Result must be an error message.
* Search for an organization that is public, e.g. `netflix`. Result must be a list of top 30 repositories sorted on the total number of forks.
* A repository with no commits will display a modal with a message that there are no commits to view.
* A repository with a commit history will display a modal with the top 10 commits and a link to view the commit.

#### Future enhancements
* User authentication and request logging to provide a history of operations.
* Option to view repositories based on different metrics such as most recent commits, search projects in a repo, most pull requests, most commits, max watchers, max size, open issues, etc.
* Display more than 30 repos using pagination.
* Display more than top 10 commits using pagination.
* Display more details on the commits show such as commit made by, date, commit

