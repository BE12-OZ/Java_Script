document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log('폼이 제출되었습니다!');

    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
});