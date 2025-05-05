const IMAGES = {
    commonImages: {
        logo: new URL("@/assets/images/common/logo.png", import.meta.url).href,
        logo_intro: new URL("@/assets/images/common/logo_intro.png", import.meta.url).href,
        icon_like: new URL("@/assets/images/common/icon_like.svg", import.meta.url).href,
        image_error: new URL("@/assets/images/common/image_error.jpg", import.meta.url).href,
    },
    introImages: {
        character: new URL("@/assets/images/intro/character.png", import.meta.url).href,
        btnText: new URL("@/assets/images/intro/button_txt.png", import.meta.url).href,
        airplane: new URL("@/assets/images/intro/icon_plane.svg", import.meta.url).href,
    },
    mainImages: {
        none_content: new URL("@/assets/images/main/none_content.png", import.meta.url).href,
    }
}

export default IMAGES;