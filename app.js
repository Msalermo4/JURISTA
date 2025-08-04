
async function searchCases() {
    const query = document.getElementById("searchInput").value.trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(
            `https://www.courtlistener.com/api/rest/v3/search/?q=${encodeURIComponent(query)}&type=o&order_by=dateFiled`, {
                headers: {
                    "Authorization": "Token 7b6a462912c7ba584bd7150157a2d116824a0527"
                }
            }
        );

        const data = await response.json();
        resultsDiv.innerHTML = "";

        if (data.results && data.results.length > 0) {
            data.results.forEach(result => {
                const div = document.createElement("div");
                const link = document.createElement("a");
                const url = "https://www.courtlistener.com" + result.absolute_url;
                link.href = url;
                link.target = "_blank";
                link.textContent = result.caseName || "Unnamed Case";
                div.appendChild(link);
                resultsDiv.appendChild(div);
            });
        } else {
            resultsDiv.innerHTML = "No cases found.";
        }
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = "Something went wrong. Please try again.";
    }
}
