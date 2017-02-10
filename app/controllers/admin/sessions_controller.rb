class Admin::SessionsController < Admin::AdminApplicationController
  skip_before_filter :authenticate, only: [:new, :create]
  layout 'application', only: [:new]

  def new
  end

  def create
    @admin= Admin.find_by_email(params[:email])
    if @admin && @admin.authenticate(params[:password])
      session[:admin_id] = @admin.id
      redirect_to admin_root_path
    else
      flash[:error] = "Unable to verify your email and password, try again."
      render 'new'
    end
  end

  def destroy

  end
end
