// ==========================================
// ADUHAI (Aryadi Education AI)
// Gemini API
// ==========================================

let API_KEY = localStorage.getItem("gemini_api_key");

if (!API_KEY) {
    API_KEY = prompt("Masukkan Gemini API Key:");
    if (API_KEY) {
        localStorage.setItem("gemini_api_key", API_KEY);
    } else {
        alert("API Key diperlukan agar chatbot dapat digunakan.");
        throw new Error("API Key tidak diisi.");
    }
}

const question = document.getElementById("question");
const button = document.getElementById("sendBtn");
const answer = document.getElementById("answer");

button.addEventListener("click", async () => {

    const prompt = question.value.trim();

    if (prompt === "") {

        answer.innerHTML = "Silakan tulis pertanyaan terlebih dahulu.";

        return;

    }

    answer.innerHTML = "⏳ ADUHAI sedang berpikir...";

    button.disabled = true;

    try {

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "X-goog-api-key": API_KEY

                },

                body: JSON.stringify({

                    contents: [

                        {

                            parts: [

                                {

                                    text: prompt

                                }

                            ]

                        }

                    ]

                })

            }

        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {

            answer.innerHTML =
                "❌ " + (data.error?.message || "Terjadi kesalahan.");

            return;

        }

        answer.innerHTML =
            data.candidates[0].content.parts[0].text;

    }

    catch (error) {

        console.error(error);

        answer.innerHTML =
            "❌ Tidak dapat terhubung ke Gemini.";

    }

    finally {

        button.disabled = false;

    }

});