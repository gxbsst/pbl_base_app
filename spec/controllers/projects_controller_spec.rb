require 'rails_helper'

describe ProjectsController do
  describe 'POST #create' do
   before(:each)  do
       post :edit, project: attributes_for(:project), format: :json
   end
    
    it { expect(response).to render_template :show }

  end
end