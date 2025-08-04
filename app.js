async function searchCases(query) {
  const response = await fetch(`https://www.courtlistener.com/api/rest/v3/search/?type=o&q=${encodeURIComponent(query)}`, {
    headers: { "Authorization": `Token ${API_KEY}` }
  });
  const data = await response.json();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  data.results.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${item.caseName}</strong><br><a href="${item.absolute_url}" target="_blank">Read Opinion</a><hr>`;
    resultsDiv.appendChild(div);
  });
}

