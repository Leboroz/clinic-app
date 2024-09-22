document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-confirm]');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const confirmationMessage = button.dataset.confirm;

      if (confirm(confirmationMessage)) {
        button.form.submit();
      }
    });
  });

  const appointments = document.querySelector('#appointments')
  const appointmentsArray = Array.of(...appointments.children)
  const paginationContainer = document.querySelector('#pagination');
  const prevButton = document.querySelector('#prevButton');
  const nextButton = document.querySelector('#nextButton');
  const arrayOfPages = [];
  let page = 0;
  const pageSize = 10;
  const lastPage = Math.ceil(appointmentsArray.length / pageSize);


  const insertSlicedElements = () => {
    appointments.innerHTML = ''
    appointments.append(...appointmentsArray.slice(page, page + pageSize))
  }
  const removeActive = (el) => {
    el.classList.remove('active')
    el.removeAttribute('aria-current');
  }
  const setActive = (el) => {
    el.classList.add('active')
    el.setAttribute('aria-current', 'page');
  }
  const updateButton = (button, pageI) => {
    if (page === pageI) {
      button.parentNode.classList.add('disabled')
    } else {
      button.parentNode.classList.remove('disabled')
    }
  }
  const updateButtons = () => {
    updateButton(prevButton, 0);
    updateButton(nextButton, (lastPage - 1) * 10);
  }
  if (appointments) {
    insertSlicedElements();

    nextButton.addEventListener('click', () => {
      const currentActivePagebutton = paginationContainer.querySelector('.active');
      if (currentActivePagebutton.firstChild.innerText == lastPage) return;
      removeActive(currentActivePagebutton);
      setActive(currentActivePagebutton.nextSibling);
      page++;
      updateButtons()
      insertSlicedElements();
    })

    prevButton.addEventListener('click', () => {
      const currentActivePagebutton = paginationContainer.querySelector('.active');
      if (currentActivePagebutton.firstChild.innerText == 1) return;
      removeActive(currentActivePagebutton);
      setActive(currentActivePagebutton.previousSibling);
      page--;
      updateButtons()
      insertSlicedElements();
    })

    for (let i = 1; i <= lastPage; i++) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      li.className = "page-item";
      if (i === 1) {
        li.classList.add('active')
        li.setAttribute('aria-current', 'page');
      }
      button.className = "page-link";
      button.innerText = i;
      button.addEventListener('click', (e) => {
        const currentPagebutton = e.currentTarget.innerText
        if ((parseInt(currentPagebutton) - 1) * pageSize === page) return;
        page = (parseInt(currentPagebutton) - 1) * pageSize;
        const currentActivePagebutton = paginationContainer.querySelector('.active');

        removeActive(currentActivePagebutton);
        setActive(e.currentTarget.parentNode)
        updateButtons()
        insertSlicedElements();
      })
      li.appendChild(button);
      paginationContainer.insertBefore(li, paginationContainer.lastElementChild);
    }
  }
});

