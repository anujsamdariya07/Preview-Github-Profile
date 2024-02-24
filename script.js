const url = "https://api.github.com/users/"

const searchInputElement = document.getElementById("search-input")
const searchButtonElement = document.getElementById("search-btn")
const profileContainerElement = document.getElementById("profile-container")
const loadingElement = document.getElementById("loading")

const generateProfile = (profile) => {
    return `<div class="profile-box">
    <div class="top-section">
        <div class="left">
            <div class="avatar">
            <img src="${profile.avatar_url}" alt="avatar"/>
            </div>
            <div class="self">
                <h1>${profile.name}</h1>
                <h4>@${profile.login}</h4>
            </div>
        </div>
        <a href = "${profile.repos_url}">
            <button id = "check-profile-btn" class = "primary-btn">
                <a href = "https://github.com/${searchInputElement.value}"style = "color: #fff;
                text-decoration: none;">Check Profile</a>
            </button>
        </a>
    </div>
    <div class="about">
        <h2>About</h2>
        <p>${profile.bio}</p>
    </div>
    <div class="status">
        <div class="status-item">
            <h3>Followers</h3>
            <p>${profile.followers}</p>
        </div>
        <div class="status-item">
            <h3>Followings</h3>
            <p>${profile.following}</p>
        </div>
        <div class="status-item">
            <h3>Repos</h3>
            <p>${profile.public_repos}</p>
        </div>
    </div>
</div>`
    
}

const fetchProfile = async () => {
    const username = searchInputElement.value

    loadingElement.innerText = "Loading....."
    loadingElement.style.color = "black"

    try {
        const response = await fetch(`${url}${username}`)
        const data = await response.json()

        console.log(data)

        if (data.bio === null) {
            data.bio = "*Bio not available for this user."
        }

        if (data.name) {
            loadingElement.innerText = ""
            profileContainerElement.innerHTML = generateProfile(data)
        } else {
            loadingElement.innerHTML = `No such profile found for the username: ${username}.`
            loadingElement.style.color = "red"
        }
    } catch(error) {
        console.log("An error has occured.")
        loadingElement.innerText = ""
    }
    console.log(profileContainerElement)
    console.log(loadingElement)
}
searchButtonElement.addEventListener("click", fetchProfile)