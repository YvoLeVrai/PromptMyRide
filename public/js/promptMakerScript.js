$(document).ready(function(){

    var slideIndex = 0;
    var stylesCarousel = $('.stylesCarousel');
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
    for (let i = 0; i < 24; i++) {
        slideIndex++;
        mediumCarousel.add('<li class="splide__slide card m-2 border border-5 mediums" id="medium-' + slideIndex + '">' +
                            '   <img class="card-img-top pe-none" src="images/Mediums/medium (' + slideIndex + ').png"/>' +
                            '   <div class="card-body">' +
                            '       <p class="card-text">Medium n°' + slideIndex + '</p>' +
                            '   </div>' +
                            '</li>');
    }

    slideIndex = 0;

    // Styles
    for (let i = 0; i < 7; i++) {
        slideIndex++;
        stylesCarousel.add('<div class="splide__slide card m-2 border border-5 styles" id="style-' + slideIndex + '">' +
                            '   <img class="card-img-top pe-none" src="images/Styles/style (' + slideIndex + ').png"/>' +
                            '   <div class="card-body">' +
                            '       <p class="card-text">Style n°' + slideIndex + '</p>' +
                            '   </div>' +
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

    // Click on Carousel cards handling
    $('.card').click(function(event) {
        var div = event.currentTarget;
        var id = div.id;

        var selectedClass = "border-success";

        // Select Mediums
        if (id.includes("medium"))
        {
            if (!div.className.includes(selectedClass))
            {
                if(selectedMedium != null)
                {
                    var selectedCard = $('#' + selectedMedium);
                    selectedCard.removeClass(selectedClass);
                }

                div.className += ' ' + selectedClass;
                selectedMedium = id;
                // Change selected medium aside title of the carousel
                $('#selectedMedium').text(div.querySelector('.card-text').innerText);
            }
        }

        // Select Styles
        if (id.includes("style"))
        {
            var header = $('#selectedStyles');

            // Tests if not already selected
            if (!div.className.includes(selectedClass))
            {
                div.className += ' ' + selectedClass;

                // Add Selected style by title of the carousel
                header.text(header.text() + ', ' + div.querySelector('.card-text').innerText);
            }
            else
            {
                div.className = div.className.replace(" " + selectedClass, "");

                // Delete deselected style from title
                header.text(header.text().replace(', ' + div.querySelector('.card-text').innerText, ''));
            }
        }
    });

    var selectedClass = "border-success";

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
            $('#selectedMedium').text(slideContent.querySelector('.card-text').innerText);
        }
    });

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
    var medium = $('#selectedMedium').text();
    var styles = $('#selectedStyles').text();
    var tips = $('#selectedTips').text();

    var fullPrompt = '/imagine prompt:' + medium + ' ' + textPrompt + styles + tips;

    navigator.clipboard.writeText(fullPrompt)
        .then(() => {
        alert("successfully copied");
        })
        .catch(() => {
            alert("something went wrong");
        });

    //alert("Copied the text: " + fullPrompt);
}