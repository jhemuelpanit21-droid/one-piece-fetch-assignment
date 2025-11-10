// =========================

function displayResults(posts, container) {
  container.innerHTML = '';

  for (const post of posts) {
	const postDiv = document.createElement('div');
	postDiv.className = 'post';

	const body = createEl('div', post.content);
	postDiv.appendChild(body);

	if (post.commentsError) {
	  const err = createEl('div', `Comments error: ${post.commentsError}`);
	  err.className = 'error';
	  postDiv.appendChild(err);
	}

	const commentsDiv = document.createElement('div');
	commentsDiv.className = 'comments';
	if (post.comments && post.comments.length) {
	  for (const c of post.comments) {
		const cEl = document.createElement('div');
		cEl.textContent = `${c.username}: ${c.comment}`;
		commentsDiv.appendChild(cEl);
	  }
	} else {
	  const none = createEl('div', 'No comments');
	  commentsDiv.appendChild(none);
	}

	postDiv.appendChild(commentsDiv);
	container.appendChild(postDiv);
  }
} // AS23/script.js========================

// Helper to create an element with text
function createEl(tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el;
}

// UI wiring
const seqBtn = document.getElementById('sequentialBtn');
const parBtn = document.getElementById('parallelBtn');
const output = document.getElementById('output');
const status = document.getElementById('status');


seqBtn.addEventListener('click', async () => {
status.textContent = 'Loading...';
const spinner = document.createElement('span');
spinner.className = 'spinner';
spinner.textContent = '⏳';
status.appendChild(spinner);


const start = Date.now();
const data = await fetchDataSequentially(1);
const end = Date.now();


displayResults(data, output);
status.textContent = `Done — ${end - start}ms`;
});


parBtn.addEventListener('click', async () => {
status.textContent = 'Loading...';
const spinner = document.createElement('span');
spinner.className = 'spinner';
spinner.textContent = '⏳';
status.appendChild(spinner);


const start = Date.now();
const data = await fetchDataInParallel(1);
const end = Date.now();


displayResults(data, output);
status.textContent = `Done — ${end - start}ms`;
});


// Optional: expose some functions for console testing
window._fetchDataSequentially = fetchDataSequentially;
window._fetchDataInParallel = fetchDataInParallel;
window._getUserContent = getUserContent;