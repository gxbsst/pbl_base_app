require 'rails_helper'

describe Project do
  before(:each) do
   @project = Project.new(project_name: 'abc')
  end

  it { expect(@project.name).to eq('.')}
end