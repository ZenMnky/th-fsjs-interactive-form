<!-- This is just a scratchpad for use during development -->

okay, so, i need validation. when?
when focus is changed from the field
when user submits the form

what will happen?
run validation check
if true, hide message and reset field (CSS)
if false, display message and highlight the field in red border (CSS)

I can do this by creating a CSS class for 'invalid'.

if error exists
    then prevent form from submittting (preventDefault)


if field focus changes (blur), then validate that field

if submit button is clicked, validate all applicable fields
    if any applicable field !valid, then preventDefault
    else, submit