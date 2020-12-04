
const sections_list = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();

const default_active_section = document.querySelector('section');
default_active_section.classList.add('active_section')

function smoothscroll(event){
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetsection = document.querySelector(targetId);
    targetsection.scrollIntoView({behavior: 'smooth', block: "center",});

}

function active_section_old(sections_list){
    
    for(section of sections_list){
        const active_sections = document.querySelectorAll('.active_section');
        const rect = section.getBoundingClientRect();
        let height = window.innerHeight;
        if(rect.height > window.innerHeight - 10){
            height = rect.height + 10;
        }
        if(rect.top >= 0 && rect.bottom <= height){
            active_sections.forEach(section=>{
                console.log(section, 'section');
                console.log();
                section.classList.remove('active_section');
                const section_id = section.getAttribute('id');
                const section_link = document.querySelector(`#${section_id}_link`)
                section_link.classList.remove('active_link');

            });
            section.classList.add('active_section');
            const section_id = section.getAttribute('id');
            const section_link = document.getElementById(`${section_id}_link`);
            section_link.classList.add('active_link');
            
            break;
        }
    }

}

function active_section(sections_list, type){

    const active_section = document.querySelector('.active_section');
    active_section.classList.remove('active_section');
    const section_id = active_section.getAttribute('id');
    const section_link = document.querySelector(`#${section_id}_link`)
    section_link.classList.remove('active_link');

    for(section of sections_list){
        const rect = section.getBoundingClientRect();
        let height = window.innerHeight;
        if(rect.height > window.innerHeight - 10){
            height = rect.height + 10;
        }
        if(rect.top >= 0 && rect.bottom <= height){
            section.classList.add('active_section');
            console.log('newactivesection', section);
            const section_id = section.getAttribute('id');
            const section_link = document.getElementById(`${section_id}_link`);
            section_link.classList.add('active_link');
            if(type == "top"){
                break;
            }
        }
    }

}

function active_target(target){

    const active_sections = document.querySelectorAll('.active_section');
    active_sections.forEach(section=>{
        section.classList.remove('active_section');
        const section_id = section.getAttribute('id');
        const section_link = document.querySelector(`#${section_id}_link`)
        section_link.classList.remove('active_link');
    });
    target.classList.add('active_link');
    const target_id = target.getAttribute('href');
    const section = document.querySelector(target_id);
    section.classList.add('active_section');
    }

function active_scroll(){
    const element = document.querySelector('.active_section');
    const rect = element.getBoundingClientRect();
    if(element == null){
        active_section(sections_list, 'top')
    }
    if(rect.top < 0){
        active_section(sections_list, 'top')
    }
    let height = window.innerHeight;
    if(rect.height > window.innerHeight - 10){
        height = rect.height + 10;
    }
    if(rect.bottom > height){
        active_section(sections_list, 'bottom');
    }
}

sections_list.forEach(section=>{
    const section_name = section.getAttribute('data-nav');
    const section_id = section.getAttribute('id');
    const section_link = document.createElement('li');
    section_link.innerHTML = `${section_name}`;
    section_link.innerHTML = `<a id="${section_id}_link" href="#${section_id}" >${section_name}</a>`;
    fragment.appendChild(section_link);
    const link = section_link.getElementsByTagName('a')[0];
    link.addEventListener('click', smoothscroll);


})

const list_element = document.querySelector('#navbar_list');
list_element.appendChild(fragment);

const section_id = default_active_section.getAttribute('id');
const section_link = document.getElementById(`${section_id}_link`);
section_link.classList.add('active_link');

const navbar_list = document.querySelectorAll('#navbar_list li a')

navbar_list.forEach(link=>{
    link.addEventListener('click', function(event){
        event.preventDefault();
        const target = event.currentTarget;
        setTimeout(active_target, 100, target)
    });
});



window.addEventListener('scroll', ()=>{setTimeout( active_scroll, 200)});

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
