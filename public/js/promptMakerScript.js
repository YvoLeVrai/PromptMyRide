$(document).ready(function(){

    var slideIndex = 0;
    var tipsButtons = $('.tipsButtons');

    var selectedMedium = null;


    // Initializing carousels
    var mediumCarousel = new Splide( '#carouselMedium', {
        type   : 'slide',
        drag : 'free',
        perPage: 6,
        breakpoints: {
            640: {
                perPage: 3,
            },
        }
    } ).mount();

    var stylesCarousel = new Splide( '#carouselStyles', {
        type   : 'slide',
        drag : 'free',
        perPage: 6,
        breakpoints: {
            640: {
                perPage: 3,
            },
        }
    } ).mount();

    // Filling carousels with cards
    // Mediums
    for (let mediumId in keywords.mediums) {
        mediumCarousel.add('<li class="splide__slide card m-2 border border-5 mediums">' +
                            '   <img class="card-img-top pe-none" src="images/Styles/style (' + mediumId + ').png"/>' +
                            '   <div class="card-body">' +
                            '       <p class="card-text">' + keywords.mediums[mediumId].name + '</p>' +
                            '   </div>' +
                            '   <div class="mediumId d-none">medium-' + mediumId + '</div>' +
                            '   <div class="value d-none">' + keywords.mediums[mediumId].value + '</div>' +
                            '</li>');
    }

    // Styles
    for (let styleId in keywords.styles) {
        stylesCarousel.add('<div class="splide__slide card m-2 border border-5 styles medium-' + keywords.styles[styleId].medium + '" id="style-' + styleId + '">' +
                            '   <img class="card-img-top pe-none" src="images/Mediums/medium (' + styleId + ').png"/>' +
                            '   <div class="card-body">' +
                            '       <p class="card-text">' + keywords.styles[styleId].name + '</p>' +
                            '   </div>' +
                            '   <div class="medium-' + keywords.styles[styleId].medium + ' d-none">medium-' + keywords.styles[styleId].medium + '</div>' +
                            '   <div class="value d-none">' + keywords.styles[styleId].value + '</div>' +
                            '</div>');
    }

    slideIndex = 0;

    // Filling tips
    for (let i = 0; i < 10; i++) {
        slideIndex++;
        tipsButtons.append( '<input type="checkbox" class="btn-check" id="btn-check' + slideIndex + '" autocomplete="off">' +
                            '<label class="btn btn-primary d-flex flex-row m-1" for="btn-check' + slideIndex + '">' +
                            '   <i class="bi bi-plus-lg me-2"></i>' +
                            '   tip #' + slideIndex + '' +
                            '</label>');
    }

    // Click on cards handling
    var selectedClass = "border-success";

    // Select Mediums
    mediumCarousel.on('click', function (Slide) {
        var slideContent = Slide.slide;
        var header = $('#selectedMedium');

        if (!slideContent.className.includes(selectedClass))
        {
            if(selectedMedium != null)
            {
                var selectedCard = $('#' + selectedMedium);
                selectedCard.removeClass(selectedClass);
            }

            slideContent.className += ' ' + selectedClass;
            selectedMedium = slideContent.id;

            // Change selected medium aside title of the carousel
            header.text(slideContent.querySelector('.card-text').innerText);

            // Filter the styles
            console.log(stylesCarousel.Components.Slides.filter('.' + slideContent.querySelector('.mediumId').innerText));
        }
    });

    // Select Styles
    stylesCarousel.on('click', function (Slide) {
        var slideContent = Slide.slide;
        var header = $('#selectedStyles');

        // Tests if not already selected
        if (!slideContent.className.includes(selectedClass))
        {
            slideContent.className += ' ' + selectedClass;

            // Add Selected style by title of the carousel
            header.text(header.text() + ', ' + slideContent.querySelector('.card-text').innerText);
        }
        else
        {
            slideContent.className = slideContent.className.replace(" " + selectedClass, "");

            // Delete deselected style from title
            header.text(header.text().replace(', ' + slideContent.querySelector('.card-text').innerText, ''));
        }
    });

    //Check clicks on Tips and modify header
    $('.btn-check').click(function(event) {
        var btn = event.currentTarget;

        var header = $('#selectedTips');
        var label = $("label[for='" + $(this).attr('id') + "']");

        // Tests if not already selected
        if ($(this).is(':checked'))
        {
            // Add Selected Tip
            header.text(header.text() + ', ' + label.text());

            // Change icon to -
            label.children().removeClass("bi-plus-lg");
            label.children().addClass("bi-dash-lg text-danger");
        }
        else
        {
            // Delete deselected Tip
            header.text(header.text().replace(', ' + label.text(), ''));

            // Change icon to +
            label.children().removeClass("bi-dash-lg text-danger");
            label.children().addClass("bi-plus-lg");
        }
    });
});

function copyPrompt()
{
    var textPrompt = $('#textPrompt')[0].value;
    var medium = $('.mediums.border-success > .value')[0].innerText;
    var styles = $('.styles.border-success > .value');
    var tips = $('#selectedTips').text();

    var stylesPromptPart = "";

    console.log(styles)

    styles.each(function(i, style)
    {
        stylesPromptPart += ', ' + style.innerText;
    });

    var fullPrompt = '/imagine prompt:' + medium + ' ' + textPrompt + stylesPromptPart + tips;

    navigator.clipboard.writeText(fullPrompt)
        .then(() => {
        alert("successfully copied");
        })
        .catch(() => {
            alert("something went wrong");
        });

    //alert("Copied the text: " + fullPrompt);
}