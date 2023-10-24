import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, page } from "../index.js";
import { addLike, removeLike } from "../api.js";
// import { formatDistance } from "date-fns";
// import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const postsHtml = posts
    .map(
      (post) => `<li class="post">
  <div class="post-header" data-user-id="${post.user.id}">
      <img src="${post.user.imageUrl}" class="post-header__user-image">
      <p class="post-header__user-name">${post.user.name}</p>
  </div>
  <div class="post-image-container">
    <img class="post-image" src="${post.imageUrl}">
  </div>
  <div class="post-likes">
    <button data-post-id="${post.id}" data-post-liked="${
      post.isLiked
    }" class="like-button">
      <img src="../assets/images/${
        post.isLiked ? "like-active" : "like-not-active"
      }.svg">
    </button>
    <p class="post-likes-text">
      Нравится: <strong>${post.likes.length}</strong>
    </p>
  </div>
  <p class="post-text">
    <span class="user-name">${post.user.name}</span>
    ${post.description}
  </p>
  <p class="post-date">
  ${new Date(post.createdAt)} назад
  </p>
</li>`,
    )
    .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  ${postsHtml}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  if (getToken()) {
    for (let like of document.querySelectorAll(".like-button")) {
      if (like.dataset.postLiked === "true") {
        like.addEventListener("click", () => {
          removeLike({ id: like.dataset.postId, token: getToken() }).then(
            () => {
              goToPage(page);
            },
          );
        });
      } else {
        like.addEventListener("click", () => {
          addLike({ id: like.dataset.postId, token: getToken() }).then(() => {
            goToPage(page);
          });
        });
      }
    }
  }
}