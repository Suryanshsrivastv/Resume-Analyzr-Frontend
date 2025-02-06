function analyzeResume() {
    const input = document.getElementById("resumeInput");
    const resultBox = document.getElementById("analysisResult");

    if (input.files.length === 0) {
        alert("Please upload a resume file.");
        return;
    }

    const file = input.files[0];
    const formData = new FormData();
    formData.append("resume", file);

    console.log("Sending request to server...");

    fetch("https://backend-web-service-for-analysis-of.onrender.com/api/files/uploadresume", { 
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const a = JSON.stringify(data);
        console.log(data);
        
        if (data.candidates?.[0]?.parts?.[0]?.text) {
            console.log("result aaya");
            const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            resultBox.innerHTML = `<strong>Analysis Result:</strong><br>${analysisText}`;
            resultBox.style.display = "block";
        }
        else {
            console.log("result nahi aaya");
            resultBox.innerHTML = "Error analyzing resume.";
            resultBox.style.display = "block";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        resultBox.innerHTML = "Error analyzing resume.";
        resultBox.style.display = "block";
    });
    
}

