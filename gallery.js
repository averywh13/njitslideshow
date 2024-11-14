let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds






$(document).ready(() => {
  $('.details').hide()
  startTimer ();
  $('moreIndicator').on('click', function (){
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle();
  })
  $('#nextPhoto').on('click', showNextPhoto);
  $('#prevPhoto').on('click', showPrevPhoto);

  fetchJSON()
})







// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    type: 'GET',
    url: mUrl,
    success: function (data) {

      mImages = data.images;

      document.getElementById('photo').src = mImages[0].imgPath
      document.getElementById('name').textContent = `Name: ${mImages[0].name}`
      document.getElementById('description').textContent = `Description: ${mImages[0].description}`
      document.getElementById('claim').textContent = `Claimed By: ${mImages[0].claim}`

    },
  });
}







// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  let imageData = mImages[mCurrentIndex];
  $('#photo').attr("src",imageData.imgPath);
  $('.name').text("Name: " + imageData.name);
  $('.description').text("Description: " + imageData.description);
  $('.claim').text("Claimed By: " + imageData.claim);
}







// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
    mCurrentIndex++;
    if (mCurrentIndex == mImages.length) {
      mCurrentIndex = 0;
    }

    console.log(mCurrentIndex);
    swapPhoto();
}






// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  mCurrentIndex--;
    if (mCurrentIndex < 0) {
      mCurrentIndex = mImages.length - 1;
    }

    console.log(mCurrentIndex);
    swapPhoto();
}







// Starter code for the timer function
function startTimer() {
  setInterval(() => {
    showNextPhoto();
  }, mWaitTime);
}
