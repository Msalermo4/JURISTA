
async function searchCases() {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Loading...";

    const response = await fetch(`https://www.courtlistener.com/api/rest/v3/search/?q=${encodeURIComponent(query)}`, {
        headers: {
            "Authorization": "Token 7b6a462912c7ba584bd7150157a2d116824a0527"
        }
    });

    const data = await response.json();
    resultsDiv.innerHTML = "";

    if (data.results && data.results.length > 0) {
        data.results.forEach(caseData => {
            const link = document.createElement("a");
            link.href = "https://www.courtlistener.com" + caseData.absolute_url;
            link.textContent = caseData.caseName || "View Case";
            link.target = "_blank";

            const div = document.createElement("div");
            div.appendChild(link);
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.innerHTML = "No cases found.";
    }
}
