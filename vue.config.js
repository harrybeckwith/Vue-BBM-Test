module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/sass/framework/framework";
          @import "@/sass/ui/ui";
        `
      }
    }
  }
}
