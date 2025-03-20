document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("products-container");

    // Show loading message
    container.innerHTML = "<p>Loading products, please wait...</p>";

    try {
        // Fetch products from DummyJSON API
        const response = await fetch("https://dummyjson.com/products?limit=100");
        if (!response.ok) throw new Error(`Network error: ${response.status}`);

        const data = await response.json();
        const products = data.products;

        // Clear loading message
        container.innerHTML = "";

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
                <textarea placeholder="Write a review..."></textarea>
                <button class="review-btn">Submit Review</button>
                <div class="reviews"></div>
            `;

            // Review submission functionality
            productCard.querySelector(".review-btn").addEventListener("click", () => {
                const reviewText = productCard.querySelector("textarea").value;
                if (reviewText) {
                    const reviewDiv = document.createElement("p");
                    reviewDiv.className = "review";
                    reviewDiv.innerText = reviewText;
                    productCard.querySelector(".reviews").appendChild(reviewDiv);
                }
            });

            container.appendChild(productCard);
        });

    } catch (error) {
        console.error("Fetch error:", error);
        container.innerHTML = `<p style="color: red;">Failed to load products. Please try again later.</p>`;
    }
});
