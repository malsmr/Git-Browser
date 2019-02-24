var GitBrowser = function () { };

var search = {
  orgName: '',
  repos: [],
  selectedRepo: '',
  commits: []
};

var API_URL = 'https://api.github.com';
var GIT_URL = 'https:/www.github.com/';

GitBrowser.prototype.init = function () {
  this.bindEvents();
}

GitBrowser.prototype.bindEvents = function () {
  var self = this;
  $('form').on('click', '[type="submit"]', function (e) {
    self.handleSubmit(e);
  });
  $('#results').on('click', 'button', function (e) {
    self.handleViewCommits(e);
  });
  $('.modal').on('click', '.close', function () {
    self.closeModal();
  });
}

GitBrowser.prototype.handleSubmit = function (e) {
  e.preventDefault();
  this.resetRepoList();
  search.orgName = $('input[type="text"]').val();
  if (search.orgName !== '') { this.getRepos() }
}

GitBrowser.prototype.handleViewCommits = function (e) {
  e.preventDefault();
  search.selectedRepo = $(e.target).attr('data-repo');
  this.getCommits();
}

GitBrowser.prototype.getRepos = function () {
  var self = this;
  $.ajax(API_URL + '/orgs/' + search.orgName + '/repos')
    .done(function (response) {
      search.repos = response;
      self.loadRepos();
    }).fail(function (error) {
      self.handleNoReposFound();
    });
}

GitBrowser.prototype.getCommits = function () {
  var self = this;
  $.ajax(API_URL + '/repos/' + search.orgName + '/' + search.selectedRepo + '/commits?per_page=10')
    .done(function (response) {
      search.commits = response;
      self.loadCommits();
    }).fail(function (error) {
      console.log(error);
    });
}

GitBrowser.prototype.handleNoReposFound = function () {
  search.repos = [];
  search.selectedRepo = '';
  search.commits = [];
  this.resetRepoList();
  $('.repos').append('<h3><span class="errorMessage">Sorry, No repositories were found under the name ' + search.orgName + '!</span><h3>');
}

GitBrowser.prototype.loadRepos = function () {
  var repo = '';
  var reposList = search.repos
    .sort(function (a, b) { return b.forks_count - a.forks_count })
    .map(function (repo, i) {
      return '<li>' +
        '<span class="repoName">' + repo.name + '</span><br />' +
        '<span class="forkcount">' + repo.forks_count + ' forks </span><br/>' +
        '<br/><button data-repo="' + repo.name + '"> View commits </button>' +
        '</li>'
    });
  $('#results').append(reposList);
  $('#results').append('<br/><a href="' + GIT_URL + search.orgName + '" target="_blank"><b>View all repositories in git ➩ </b></a>');
}

GitBrowser.prototype.loadCommits = function () {
  var commitsList = search.commits.map(function (commit, i) {
    return '<li>' +
      '<span>' + commit.commit.message + '</span>' +
      '<a href="' + commit.html_url + '" target="_blank"> View in git ➩ </a>' +
      '</li>'
  });
  $('#modal-content').find('ul').html('');
  $('#modal-content').find('ul').append(commitsList);
  $('#modal-content').find('ul').append('<br/><a href="' + GIT_URL + search.orgName + '/'
    + search.selectedRepo + '" target="_blank"><b>View all commits in git ➩ </b></a>');
  this.launchModal();
}

GitBrowser.prototype.launchModal = function () {
  $('.modal').show();
  $('#overlay').show();
  $('.modal').find('h3').text('Commit history for ' + search.selectedRepo);
  $('body').css('overflow', 'hidden');
}

GitBrowser.prototype.closeModal = function () {
  $('.modal').hide().find('h4').empty();
  $('#overlay').hide();
  $('body').css('overflow', 'auto');
  this.resetSelectedRepo();
}

GitBrowser.prototype.resetRepoList = function () {
  $('.repos').find('h3').remove();
  $('#results').html('');
}

GitBrowser.prototype.resetSelectedRepo = function () {
  search.commits = [];
}

$(document).ready(function () {
  var gitbrowser = new GitBrowser();
  gitbrowser.init();
});
