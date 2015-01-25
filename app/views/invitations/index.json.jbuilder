json.data do
  json.partial! 'invitations/invitation', collection: @invitations.data, :as => :invitation
end if @invitations
json.meta @invitations.meta if @invitations