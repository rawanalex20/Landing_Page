// Global Variables
const sections_list = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();

// --Functions--

// --Scroll Smoothly to Target Section
function smoothscroll(event){
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetsection = document.querySelector(targetId);
    targetsection.scrollIntoView({behavior: 'smooth', block: "center",});

}


/* --Activating new section on scrolling
Call "active_section" function with the type parameter values 'top' or 'bottom' based on scroll direction
*/
function active_scroll(){
    // Get previous active section dimentions to know whether it is scrolled up or down
    const element = document.querySelector('.active_section');
    const rect = element.getBoundingClientRect();

    if(element == null){
        active_section(sections_list, 'top')
    }

    // scrolled to top
    if(rect.top < 0){
        active_section(sections_list, 'top')
    }

    let height = window.innerHeight;
    if(rect.height > window.innerHeight - 10){
        height = rect.height + 10; // to handle big sections out of boundary
    }

    // scrolled to buttom
    if(rect.bottom > height){
        active_section(sections_list, 'bottom');
    }
}

/* --Highlight active section in viewport 
 The type determines whether it is scrolled to top or down.
 Accordinly if scrolled up, "top", the the first section conatined will be active,
 while if scrolled down the type is "bottom" and the last section contained within window will be active
*/
function active_section(sections_list, type){

    // Remove all active classes
    const active_section = document.querySelector('.active_section');
    active_section.classList.remove('active_section');
    const section_id = active_section.getAttribute('id');
    const section_link = document.querySelector(`#${section_id}_link`)
    section_link.classList.remove('active_link');

    // Finding new section contained in window to be active
    for(section of sections_list){
        const rect = section.getBoundingClientRect();

        let height = window.innerHeight;
        if(rect.height > window.innerHeight - 10){
            height = rect.height + 10; // to handle big sections out of boundary
        }

        if(rect.top >= 0 && rect.bottom <= height){
            section.classList.add('active_section'); // add active class
            console.log('newactivesection', section);
            const section_id = section.getAttribute('id');
            const section_link = document.getElementById(`${section_id}_link`);
            section_link.classList.add('active_link'); // add active class to link
            if(type == "top"){
                break;
            } // if scrolled up highlight first section at top of page
            //else complete to last one
        }
    }

}

// --Highlight targeted section by link
function active_target(target){

    const active_sections = document.querySelectorAll('.active_section');

    // remove old active sections
    active_sections.forEach(section=>{
        section.classList.remove('active_section');
        const section_id = section.getAttribute('id');
        const section_link = document.querySelector(`#${section_id}_link`)
        section_link.classList.remove('active_link');
    });

    // add active class to new section
    target.classList.add('active_link');
    const target_id = target.getAttribute('href');
    const section = document.querySelector(target_id);
    section.classList.add('active_section');
    }

// dropdown show function
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    }



// --Main--


// Start with first section as default active section
const default_active_section = document.querySelector('section');
default_active_section.classList.add('active_section')


/* Create links
and add event listener for each section in list
*/
sections_list.forEach(section=>{
    const section_name = section.getAttribute('data-nav');
    const section_id = section.getAttribute('id');
    const section_link = document.createElement('li');

    section_link.innerHTML = `${section_name}`;
    section_link.innerHTML = `<a id="${section_id}_link" href="#${section_id}" >${section_name}</a>`;

    fragment.appendChild(section_link); // add new element

    // Listener for the link in navbar with click event to scroll smoothly to target section
    const link = section_link.getElementsByTagName('a')[0];
    link.addEventListener('click', smoothscroll);


})

// Add anchor elements to document
const list_element = document.querySelector('#navbar_list');
list_element.appendChild(fragment);

// Default active section
const section_id = default_active_section.getAttribute('id');
const section_link = document.getElementById(`${section_id}_link`);
section_link.classList.add('active_link');

// Adding event listener to each link
const navbar_list = document.querySelectorAll('#navbar_list li a')
navbar_list.forEach(link=>{
    link.addEventListener('click', function(event){
        event.preventDefault();
        const target = event.currentTarget;
        setTimeout(active_target, 100, target); // wait a while to reach target then highlight
    });
});

// listener to scrolling.
window.addEventListener('scroll', ()=>{setTimeout( active_scroll, 200)}); 


