// Staging (stg.*) ima drug favicon kot produkcija; en sam build gre na oba naslova,
// zato razlikovanje poteka v brskalniku glede na ime gostitelja.
(function () {
  if (location.hostname.indexOf('stg.') !== 0) return
  var links = document.querySelectorAll('link[rel="icon"]')
  for (var i = 0; i < links.length; i++) {
    links[i].href = links[i].href.replace(
      'favicon-v11/spotflow-favicon-v11-4-stolpci-crna-obroba',
      'favicon-v12/spotflow-favicon-v12-4-stolpci-rdeca-obroba'
    )
  }
})()
