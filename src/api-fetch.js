const apiKey = '595fe5f00a9176c06ddcf1f517e6c557';
const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=technology&keywords=programming&sort=published_desc`;

fetch(apiUrl)
    .then(response => response.json())
    .then(({
        data
    }) => {
        console.log(data);
        const container = document.getElementById('data-container');
        const fragment = document.createDocumentFragment(); // create a document fragment container

        data.forEach(({
            published_at,
            author,
            title,
            description,
            url
        }) => {
            const createDiv = document.createElement('div');
            createDiv.classList.add('story-container');

            const fetchDate = document.createElement('p');
            fetchDate.classList.add('date-published');

            const DateModify = new Date(published_at);

            const TimeOptions = {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            const formattedTime = DateModify.toLocaleString('en-US', TimeOptions);

            fetchDate.textContent = formattedTime;

            const fetchAuthor = document.createElement('p');
            fetchAuthor.classList.add('story-author');
            fetchAuthor.textContent = author;

            const fetchTitle = document.createElement('h1');
            fetchTitle.classList.add('story-title');
            fetchTitle.textContent = title;

            const fetchDescription = document.createElement('p');
            fetchDescription.classList.add('story-desc');

            const maxWords = 40; // set the maximum number of words to display
            const words = description.split(' '); // split the description into an array of words
            const limitedWords = words.slice(0, maxWords); // select the first n words
            const limitedDescription = limitedWords.join(' '); // join the selected words back into a string

            fetchDescription.textContent = limitedDescription + " ...";

            const ReadMoreBtn = document.createElement('a');
            ReadMoreBtn.classList.add('url');
            ReadMoreBtn.setAttribute('target', '_blank');
            ReadMoreBtn.href = url;

            const AppendSpan = document.createElement('span');
            AppendSpan.classList.add('url-span')
            AppendSpan.textContent = 'Read full article';

            createDiv.append(fetchDate, fetchAuthor, fetchTitle, fetchDescription, ReadMoreBtn, AppendSpan);
            fragment.appendChild(createDiv); // append the new element to the fragment container
        });

        container.appendChild(fragment); // append the fragment container to the DOM
    });