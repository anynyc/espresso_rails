class Admin::VideosController < Admin::AdminApplicationController
  def index
    @videos = Video.all
  end

  def new
    @video = Video.new
  end

  def create
    @video = Video.new video_params
    if @video.save
      redirect_to admin_videos_path
    else
      render 'new'
    end
  end

  def edit
    @video = Video.find(params[:id])
  end

  def update
    @video = Video.find(params[:id])
    if @video.update(video_params)
      redirect_to admin_videos_path
    else
      render 'edit'
    end
  end

  def destroy
    video = Video.find(params["id"])
    if video.destroy
      flash[:notice] = "Video successfully deleted"
      redirect_to admin_videos_path
    else
      flash[:notice] = "Could not delete video"
      redirect_to admin_videos_path
    end
  end

  private
    def video_params
      params.require(:video).permit(Video.column_names.map {|x| unless x == "id"; x.to_sym; end}.compact)
    end
end
