import ApiService from "./ApiService";
const apiService = new ApiService()
const loading = document.querySelector('.loader');
// const list = document.querySelector('.list')

// const loading = document.querySelector('.loader');

// async function showPosts() {
//   const posts = await apiService.getPopularFilms();

//   posts.forEach(post => {
//     const postEl = document.createElement('div');
//     postEl.classList.add('post');
//     postEl.innerHTML = `
//       <div class="number">${post.id}</div>
//       <div class="post-info">
//         <h2 class="post-title">${post.title}</h2>
//         <p class="post-body">${post.body}</p>
//       </div>
//     `;

//     postsContainer.appendChild(postEl);
//   });
// }

async function showFilms() {
  const films = await apiService.getPopularFilms();

}


function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      apiService.incrementPage();
      showFilms();
    }, 300);
  }, 1000);
}


showFilms();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});
