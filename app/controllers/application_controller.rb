class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  def index
    respond_to do |format|
      format.json { render json: {some: 'data'} }
    end
  end
end
