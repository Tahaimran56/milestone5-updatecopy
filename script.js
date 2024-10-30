function addExperience() {
    const experienceDiv = document.createElement('div');
    experienceDiv.classList.add('experience');
    experienceDiv.innerHTML = `
        <p>Job Title: <br>
            <input type="text" name="job[]" placeholder="Job Title">
        </p>
        <p>Company: <br>
            <input type="text" name="company[]" placeholder="Company">
        </p>
        <p>Year: <br>
            <input type="number" name="jobyear[]" placeholder="Year">
        </p>
        <p>Description: <br>
            <textarea name="description[]" placeholder="Experience description"></textarea>
        </p>`;
    document.getElementById('work-experience').appendChild(experienceDiv);
}

function addSkill() {
    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skill');
    skillDiv.innerHTML = `
        <p>Skill: <br>
            <input type="text" name="skill[]" placeholder="Any skill">
        </p>`;
    document.getElementById('skills').appendChild(skillDiv);
}

function generateResume() {
    const firstName = document.querySelector('input[name="firstname"]').value;
    const lastName = document.querySelector('input[name="lastname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const nationality = document.querySelector('select[name="countries"]').value;
    const educationLevel = document.querySelector('input[name="education_level"]').value;
    const degree = document.querySelector('input[name="degree"]').value;
    const institution = document.querySelector('input[name="institution"]').value;
    const year = document.querySelector('input[name="year"]').value;

    let experiences = '';
    const jobTitles = document.getElementsByName('job[]');
    const companies = document.getElementsByName('company[]');
    const jobYears = document.getElementsByName('jobyear[]');
    const descriptions = document.getElementsByName('description[]');

    for (let i = 0; i < jobTitles.length; i++) {
        experiences += `<p contenteditable="true"><strong>Job Title:</strong> ${jobTitles[i].value}<br>
                        <strong>Company:</strong> ${companies[i].value}<br>
                        <strong>Year:</strong> ${jobYears[i].value}<br>
                        <strong>Description:</strong> ${descriptions[i].value}</p>`;
    }

    let skills = '';
    const skillInputs = document.getElementsByName('skill[]');
    for (let i = 0; i < skillInputs.length; i++) {
        skills += `<p contenteditable="true">${skillInputs[i].value}</p>`;
    }

    const picInput = document.getElementById('profile-pic');
    const reader = new FileReader();
    reader.onload = function (e) {
        const resumeContent = `
            <h2 contenteditable="true">Resume</h2>
            <p contenteditable="true"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p contenteditable="true"><strong>Email:</strong> ${email}</p>
            <p contenteditable="true"><strong>Nationality:</strong> ${nationality}</p>
            <p><img src="${e.target.result}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;"></p>
            <h3>Education</h3>
            <p contenteditable="true"><strong>Level:</strong> ${educationLevel}<br>
            <strong>Degree:</strong> ${degree}<br>
            <strong>Institution:</strong> ${institution}<br>
            <strong>Year:</strong> ${year}</p>
            <h3>Work Experience</h3>
            ${experiences}
            <h3>Skills</h3>
            ${skills}
        `;
        document.getElementById('resume').innerHTML = resumeContent;
        document.getElementById('resume').style.display = 'block';
    };
    if (picInput.files[0]) reader.readAsDataURL(picInput.files[0]);
}

function downloadPDF() {
    const resumeElement = document.getElementById('resume');
    html2pdf(resumeElement, {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    });
}

function shareResume() {
    if (navigator.share) {
        navigator.share({
            title: 'My Resume',
            text: 'Check out my resume!',
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(console.error);
    } else {
        alert('Sharing not supported on this device.');
    }
}
