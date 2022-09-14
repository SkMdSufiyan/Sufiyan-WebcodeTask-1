let page_heading = document.getElementById('page_heading_div');
page_heading.innerHTML = "Welcome to the Makeup products' details page";

document.getElementById("loading-message-div").innerHTML = 'This page may take some time to get the API links, please wait patiently';
document.getElementById('serach-instruction-div').innerHTML = 'Type the name of the product in the search bar, it will highlight that particular product in the following list';
document.getElementById('click-to-expand-div').innerHTML = 'Click on the image to expand it, click on the product link (Check Here) to redirect';

let search_and_button = document.getElementById('search_and_button_div');

let search_field = document.getElementById('search_bar_input');
search_field.setAttribute('placeholder',"Product's name")
search_field.setAttribute('onclick','unmarkingFun()');


let search_button = document.getElementById("search_button_id");
search_button.setAttribute('onclick','markingFun()');


// The URL for supplying into the async function is given below (Makeup API)
let suppliedUrl = "https://makeup-api.herokuapp.com/api/v1/products.json";


let webCodeTask_1 = async (makeUpUrl)=>{
    try{
        let res = await fetch(makeUpUrl);
        let datFromUrl = await res.json();
    // let res = await fetch(makeUpUrl);
    // let datFromUrl = await res.json();
    
    headingDat = ["Sl.No.","Brand","Product Name","Price","Looks Like","Product Link", "Product Description"];
    let makeUpTab = document.getElementById('makeUpTable');
    for(let i=0;i<datFromUrl.length;i++){
        let tab_rows = document.createElement('tr');
        for(let j=0; j<headingDat.length; j++){
            if(i==0){
                let tab_cols = document.createElement('th');
                tab_cols.innerHTML = headingDat[j];       
                tab_rows.appendChild(tab_cols)
            }else{
                ith_data = datFromUrl[i-1];
                let tab_cols = document.createElement('td');
                if(j==0){
                    tab_cols.innerHTML = i; 
                }else if(j==1){
                    tab_cols.innerHTML=ith_data["brand"];
                }else if(j==2){
                    tab_cols.innerHTML=ith_data["name"];
                    tab_cols.setAttribute('class','proName')
                }else if(j==3){
                    let price_sign = ith_data["price_sign"];
                    tab_cols.innerHTML=ith_data["price"];
                    if(price_sign!=null){
                        tab_cols.innerHTML=ith_data["price"] + ' ' +price_sign;
                    }
                        
                }else if(j==4){
                    img_link = ith_data["api_featured_image"];
                    let view_imag_link = document.createElement('a');
                    view_imag_link.setAttribute('href',img_link);
                    view_imag_link.setAttribute('target',"_blank");
                    let imag = document.createElement('img');
                    imag.setAttribute('src',img_link);
                    imag.setAttribute('alt','Unavailable');
                    imag.style.width="30px";
                    imag.style.height="30px";
                    view_imag_link.appendChild(imag);
                    tab_cols.appendChild(view_imag_link);
                }else if(j==5){
                    product_link = ith_data["product_link"];
                    let x=document.createElement('a');
                    x.innerHTML = 'Check Here';
                    x.setAttribute('href',product_link)
                    x.setAttribute('target','_blank');
                    x.style.textDecoration="none";
                    tab_cols.appendChild(x);
                }else if(j==6){
                    let descript = document.createElement('div');
                    descript.style.height='40px';
                    descript.style.width='auto';
                    descript.style.overflow = 'scroll';
                    descript.style.overflow = 'auto';
                    descript.style.textAlign='justify';
                    descript.innerHTML = ith_data["description"];
                    tab_cols.appendChild(descript);
                }
                tab_rows.appendChild(tab_cols);
            }
    }
    makeUpTab.appendChild(tab_rows);
}
}
catch(err){
    let errorMessage = document.getElementById('tryCatch_errorMessage_div');
    errorMessage.innerHTML = err.message;
}
}

webCodeTask_1(suppliedUrl)


//  Calling onclick function (markingFun) for button
var previous_searched_memory = null;
var originalBackColor = null;
function markingFun(){   
    search_input = document.getElementById('search_bar_input');
    if(search_input.value!=''){
        let search_value = search_input.value;
        let search_value_array = search_value.split(' ');
        let search_value_upperCase_array = search_value_array.map(val=>val[0].toUpperCase()+val.slice(1));
        let search_value_upperCase = search_value_upperCase_array.join(' ');
    
        // Storing the previously searched input 
        searched_memory_value = search_value_upperCase;
        
        let y=document.querySelectorAll('.proName'); 
        // Converting y(Nodelist) into Array (y_Array)
        let y_Array = Array.from(y)
        var filtered_y = y_Array.filter((y1)=>y1['textContent']==search_value)
        previous_searched_memory = filtered_y;

        // Storing original background color (before marking)
        originalBackColor = filtered_y[0].style.backgroundColor;

        for(let y_i_color of filtered_y){
            y_i_color.style.backgroundColor='yellow';
        }

        // filtered_y[0].style.backgroundColor='yellow';
    }   
}

//  Calling onclick function (unmarkingFun) for search input
function unmarkingFun(){ 
    if(previous_searched_memory!=null){
        for(let prev_i_color of previous_searched_memory){
            prev_i_color.style.backgroundColor=originalBackColor;
        }
        // previous_searched_memory[0].style.backgroundColor=originalBackColor;
    }
}

