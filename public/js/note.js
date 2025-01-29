document.querySelectorAll('.notes-form').forEach(form => {
    const noteInput = form.querySelector('.note-input'); // Correct class selector
    if (!noteInput) return; // Skip if no input is found

    let submitBtn = null;

    noteInput.addEventListener('input', () => {
        if (noteInput.value.trim() !== "") {
            if (!submitBtn) {
                submitBtn = document.createElement('button');
                submitBtn.type = 'submit';
                submitBtn.innerHTML = "Submit";
                submitBtn.id="submit-btn"
                form.append(submitBtn);
            }
        } else {
            if (submitBtn) {
                submitBtn.remove();
                submitBtn = null;
            }
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId=noteInput.id
        const noteText=noteInput.value.trim()

        if(!noteText) return

        try{
            const response=await fetch(`/trackmint/${userId}/journal/note`,{
                method:"POST",
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify({
                    docId: docId,
                    note: noteText
                })
            });

            const data= await response.json()

            if(data.success){
                const noteP = document.createElement('p');
                noteP.textContent = data.note;
                form.replaceWith(noteP);
            } else {
                console.error('Failed to update note');
            }
        }   

        catch(err){
            console.error(err)
        }


        noteInput.value = ""; // Clear input after submission
        if (submitBtn) {
            submitBtn.remove();
            submitBtn = null;
        }
    });
});
