if @invitation.success?
  json.data do
    json.partial! 'invitations/invitation', invitation: @invitation
  end
else
  json.errors @invitation
end