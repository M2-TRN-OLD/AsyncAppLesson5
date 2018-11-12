'use strict';

const searchURL = 'https://api.github.com/';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);

  $('#results-list').empty();
  // iterate through the array of repos
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].url}">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(userName) {
    
    const url = searchURL + 'users/' + userName + '/repos';
    console.log('url is ' + url);

    fetch(url)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);