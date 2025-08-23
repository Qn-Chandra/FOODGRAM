const mobile=document.querySelector(' .menu-toggle');
const mobileLink = document.querySelector('.sidebar');

mobile.addEventListener("click",function(){
    mobile.classList.toggle("is=active");
    mobileLink.classList.toggle("active");
})

//close menu when click
mobileLink.addEventListener("click",function(){
    const menuBars=document.querySelector("is-active");
    if(window.innerWidth<=786 &&  menuBars){
        mobile.classList.toggle(".is-active");
        mobileLink.classList.toggle("active");
    }
})


//move the menu to right and left when click back and next
var step=100;
var stepFilter=60;
var scrolling=true;

$(".back").bind("click", function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollleft:"-="+step+"px"
    });
})

$(".next").bind("click",function(e){
    e.preventDefault();
    $(".highlight-wrapper").animate({
        scrollLeft: "+="+step+"px"
    })

})





const APP_ID = '92493d17';  // API id
const APP_KEY = '220a68dedc13dd6c1e3934e269fc2bd8	—'; // API key

const cache = {}; // caching for optimization

async function fetchNutrition(foodName, card) {
    const infoDiv = card.querySelector('.nutrition-info');

    if(cache[foodName]){
        // already fetched
        infoDiv.innerHTML = cache[foodName];
        return;
    }

    infoDiv.innerHTML = `
        <p>Calories: Loading...</p>
        <p>Protein: Loading...</p>
        <p>Carbs: Loading...</p>
        <p>Fat: Loading...</p>
    `;

    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(foodName)}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        let nutrients = {ENERC_KCAL:0, PROCNT:0, CHOCDF:0, FAT:0};
        if(data.parsed && data.parsed.length > 0){
            nutrients = data.parsed[0].food.nutrients;
        }

        const html = `
            <p>Calories: ${nutrients.ENERC_KCAL || 0}</p>
            <p>Protein: ${nutrients.PROCNT || 0} g</p>
            <p>Carbs: ${nutrients.CHOCDF || 0} g</p>
            <p>Fat: ${nutrients.FAT || 0} g</p>
        `;

        cache[foodName] = html; // save to cache
        infoDiv.innerHTML = html;

    } catch(err){
        infoDiv.innerHTML = `<p>Error fetching data</p>`;
        console.error(err);
    }
}

// attach hover event
document.querySelectorAll('.detail-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const foodName = card.querySelector('h4').innerText;
        fetchNutrition(foodName, card);
    });
});
