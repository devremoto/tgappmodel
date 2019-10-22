$(document).ready(function() {
    $('#summernote-modal').summernote({
        height: 280
        ,toolbar: [
            ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['picture', 'link', 'hr']]
        ]
      });
});

$( document ).ready(function() {
             
     addEmail(0, false, "Warren Beety", "Work", "Dee Mailbox is awesome!!!", true, "Today", false);
     addEmail(1, true, "Johann Doewill", null, "Meeting at 10pm", true, "two days ago", false);
     addEmail(2, true, "Patrick Ballentines", null, "Lorem ipsum at office", false, "two days ago", false);
     addEmail(3, false, "Alexander McQuint", "Social", "Unpopular message at Social Networks", false, "1 week ago", true);
     addEmail(5, false, "Rose Whitermine", null, "New issue at project", true, "10:22 01/25/2021", true);
     addEmail(6, false, "Myself", null, "Add Angular JS at Dee Admin template", true, "09:22 01/25/2021", false);
     addEmail(7, false, "Rob Watters", null, "Dee Admin Template for Twitter Bootstrap", true, "12:15 01/24/2021", true);
     addEmail(8, false, "Bonni Taylor", null, loremWords (4, true, true), false, "07:35 01/22/2021", true);
     addEmail(9, false, "Bon Heavy", "Personal", loremWords (5, true, true), false, "08:25 01/19/2021", true);
     addEmail(10, true, "M&M Associated", null, loremWords (8, true, true), false, "10:25 01/15/2021", false);
     addEmail(11, false, "Joan McKey", null, loremWords (9, true, true), true, "15:45 01/12/2021", true);
     addEmail(12, false, "Dee Admin", "Important", loremWords (4, true, true), false, "19:25 01/12/2021", true);
     addEmail(13, true, "John Doe", null, loremWords (7, true, true), false, "17:15 01/12/2021", true);
     addEmail(14, false, "Peter O'Tool", null, loremWords (6, true, true), false, "08:05 01/11/2021", true);
     addEmail(15, false, "Mac And Tosh", "Work", loremWords (6, true, true), false, "11:29 01/10/2021", false);
     addEmail(16, true, "Amazin", null, loremWords (9, true, true), false, "19:26 01/08/2021", true);
     addEmail(17, false, "Bony Tammuy", null, loremWords (5, true, true), false, "19:13 01/05/2021", true);
     addEmail(18, false, "Martin Scout", null, loremWords (6, true, true), false, "19:15 01/01/2021", true);

     function addEmail(id, important, sender, category, subject, attach, date, read) {
         var emails = $('.mb-emails');

         var newMailElm = document.createElement('tr');
         var nmClass = "mb-row ";
         if (read) {
             nmClass += "mb-row-read";
         } else {
             nmClass += "mb-row-unread";
         }
         newMailElm.setAttribute('class', nmClass);

         var checkElm = document.createElement('td');
         checkElm.setAttribute('class', "mb-check");
         checkElm.innerHTML = "<label class='option'><input type='checkbox'><span class='checkbox checkbox-light checkbox-theme'></span></label>";

         var iconsElm = document.createElement('td');
         iconsElm.setAttribute('class', "mb-icons");
         var iconsValue = "";
         if (important) {
             iconsValue = "<i class='fa fa-star color-warning'></i>";
         } else {
             iconsValue = "<i class='fa fa-star-o'></i>";
         }
         iconsElm.innerHTML = iconsValue;

         var senderElm = document.createElement('td');
         senderElm.setAttribute('onclick', 'document.location = "email_view.html"');
         senderElm.setAttribute('class', "mb-sender");
         senderElm.innerHTML = sender;

         var subjectElm = document.createElement('td');
         subjectElm.setAttribute('onclick', 'document.location = "email_view.html"');
         subjectElm.setAttribute('class', "mb-subject");
         if (category!=null) {
             var categoryElm = "<span class='label label-s ";
             if (category == 'Work') {
                 categoryElm += "label-success";
             } else if (category == 'Social') {
                 categoryElm += "label-primary";
             } else if (category == 'Personal') {
                 categoryElm += "label-warning";
             } else if (category == 'Important') {
                 categoryElm += "label-danger";
             }
             categoryElm += "'>"+category+"</span>";
             subject = categoryElm +" "+subject;
         }
         subjectElm.innerHTML = subject;

         var attachElm = document.createElement('td');
         attachElm.setAttribute('onclick', 'document.location = "email_view.html"');
         attachElm.setAttribute('class', "mb-attach");
         var attachValue = "";
         if (attach) {
             attachValue = "<i class='fa fa-paperclip'></i>";
         }
         attachElm.innerHTML = attachValue;

         var dateElm = document.createElement('td');
         dateElm.setAttribute('onclick', 'document.location = "email_view.html"');
         dateElm.setAttribute('class', "mb-date");
         dateElm.innerHTML = date;

         newMailElm.appendChild(checkElm);
         newMailElm.appendChild(iconsElm);
         newMailElm.appendChild(senderElm);
         newMailElm.appendChild(subjectElm);
         newMailElm.appendChild(attachElm);
         newMailElm.appendChild(dateElm);

         emails.append(newMailElm);
     }

 });